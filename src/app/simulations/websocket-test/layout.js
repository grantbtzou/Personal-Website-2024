import Providers from "./providers";

export default function GamePageLayout({ children }){
  return(
  <div>
    <Providers>
      {children}
    </Providers>
  </div>)
}