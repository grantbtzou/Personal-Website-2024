import Providers from "./providers.js";

export default function GamePageLayout({ children }){
  return(
  <div>
    <Providers>
      {children}
    </Providers>
  </div>)
}