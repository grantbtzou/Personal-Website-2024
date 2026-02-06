'use client'
import GraphGame from "../../components/graphGame";
import { useSocket } from "../../components/websocketprovider";

export default function Page({ params }){
  const { id } = params;
  return(<div>
    <GraphGame roomId={id}/>
  </div>)
}