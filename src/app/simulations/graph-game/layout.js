import Providers from "./_lib/providers";

export default function GamePageLayout({ children }){
  return(
  <div>
    <Providers>
      {children}
    </Providers>
  </div>)
}