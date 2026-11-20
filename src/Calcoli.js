export const SOGLIE = { attenzione: 70, critico: 90 }

// Le condizioni si controllano in ordine: prima online, poi la CPU.
export function statoServer(server) {
    return !server.online
        ? "offline"
        : server.cpu >= SOGLIE.critico
            ? "critico"
            : server.cpu >= SOGLIE.attenzione
                ? "attenzione"
                : "ok"
}

export function contaPerStato(servers, stato) {
    return servers.filter(s => statoServer(s) === stato).length
}

// Media della CPU dei soli server online; null se non ce n'è nessuno.
export function cpuMedia(servers) {
    const accesi = servers.filter(s => s.online)
    if (accesi.length === 0) {
        return null
    }
    const somma = accesi.reduce((tot, s) => tot + s.cpu, 0)
    return somma / accesi.length
}

// Il server online con la latenza più alta (oggetto intero); null se nessuno è online.
export function piuLento(servers) {
    return servers
        .filter(s => s.online)
        .reduce((lento, s) => (lento === null || s.latenza > lento.latenza ? s : lento), null)
}

export function trovaServer(servers, nome) {
    return servers.find(s => s.nome === nome)
}