'use client'
import GraphGame from "./GraphGame/graphGame";

export default function Page({ params }){
  const { id } = params;
  return(<div>
    Page {id}
    <GraphGame roomId={id}/>
  </div>)
}