function LabelNode({ data }) {
  return (
    <div className={`text-md text-gray-400 pointer-events-none border-none shadow-none bg-transparent p-0`}>
      {data.label}
    </div>
  );
}

export default LabelNode