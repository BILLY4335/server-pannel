import BadgeStato from "./BadgeStato"
import { statoServer } from "./calcoli"

function SchedaServer({ server }) {
    const { nome, ruolo, sede, ip, cpu, latenza, servizi, manutenzione } = server
    const stato = statoServer(server)

    return (
        <div className={`scheda scheda-${stato}`}>
            <h3>{nome} <BadgeStato stato={stato} /></h3>
            <p className="ruolo">{ruolo} · {sede} · {ip}</p>
            {/* cpu e latenza mancanti valgono null: si confronta con null, non si usa la falsy (lo 0 è un dato valido) */}
            <p>CPU: {cpu === null ? "—" : `${cpu}%`}</p>
            <p>Latenza: {latenza === null ? "—" : `${latenza} ms`}</p>
            {/* un array vuoto è truthy: si controlla la length */}
            <p>Servizi: {servizi.length === 0 ? "nessuno" : servizi.join(", ")}</p>
            {/* manutenzione può non esistere (undefined): prima si controlla, poi si legge dentro */}
            <p>Manutenzione: {manutenzione ? `${manutenzione.data}, ${manutenzione.motivo}` : "nessuna in programma"}</p>
        </div>
    )
}

export default SchedaServer
