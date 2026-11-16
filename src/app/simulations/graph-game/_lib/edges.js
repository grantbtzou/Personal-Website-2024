// Client copy of the server's edge rules (game/graph.ts and ws/handlers/setEdgeChange.ts), used to
// give instant feedback while dragging. The server still checks every change. Keep the two in sync.

// The middle lane. Lanes are [5, 6, 5] long, so each outer node at rank r sits between the
// middle lane's ranks r and r + 1.
export const MIDDLE_FILE = 2;

// Handles new edges attach to. The canonical source is always the left-hand (lower file) node.
export const EDGE_HANDLE = Object.freeze({
  SOURCE: "right",
  TARGET: "left",
});

export function isGameNode(node) {
  return node?.type === "laneNode" || node?.type === "baseNode";
}

function compareCoords(a, b) {
  return a.data.coords.file - b.data.coords.file || a.data.coords.rank - b.data.coords.rank;
}

// A stable id for the edge between two nodes, whichever order they're given in.
export function canonicalEdgeId(a, b) {
  const [first, second] = compareCoords(a, b) <= 0 ? [a, b] : [b, a];
  return `${first.id}-${second.id}`;
}

// The [source, target] node ids of a canonical edge id.
export function edgeEnds(edgeId) {
  return edgeId.split("-");
}

// Whether a new edge may join these nodes: one in the middle lane, the other in a neighbouring lane,
// with the middle node at the outer node's rank or one rank higher.
export function canJoinAcrossLanes(a, b) {
  const [middle, outer] = a.data.coords.file === MIDDLE_FILE ? [a, b] : [b, a];
  if (middle.data.coords.file !== MIDDLE_FILE || Math.abs(outer.data.coords.file - MIDDLE_FILE) !== 1) {
    return false;
  }
  const rankDiff = middle.data.coords.rank - outer.data.coords.rank;
  return rankDiff === 0 || rankDiff === 1;
}

function ownsAnEnd(a, b, playerOrder) {
  return a.data.owner === playerOrder || b.data.owner === playerOrder;
}

// Mirrors the server's create check.
export function canCreateEdge(a, b, edges, playerOrder) {
  if (!isGameNode(a) || !isGameNode(b) || a.id === b.id) return false;
  const id = canonicalEdgeId(a, b);
  return !edges.some((edge) => edge.id === id)
    && ownsAnEnd(a, b, playerOrder)
    && canJoinAcrossLanes(a, b);
}

// Mirrors the server's delete check.
export function canDeleteEdge(edge, nodes, playerOrder) {
  const source = nodes.find((n) => n.id === edge.source);
  const target = nodes.find((n) => n.id === edge.target);
  return isGameNode(source) && isGameNode(target) && ownsAnEnd(source, target, playerOrder);
}
