export default function WinRate({label, wins, losses}){

    return(
        <div className="mb-12 p-4 min-w-44 text-white bg-blue-500 rounded-xl">
            <h1 className="text-center text-2xl">{label}</h1>
            <div>
                <p>Wins: {wins}</p>
                <p>Losses: {losses}</p>
                <p>Winrate: {(losses+wins) === 0? "N/A" : (wins/(losses+wins)).toFixed(2)}</p>
            </div>
        </div>
    )
}