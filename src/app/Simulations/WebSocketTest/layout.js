import Providers from "./components/providers.js";

export default function GamePageLayout({ children }){
  return(
  <div>
    <Providers>
      {children}
    </Providers>
  </div>)
}