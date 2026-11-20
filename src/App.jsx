import "./App.css"
import { sistema, servers, avvisi } from "./dati"
import { contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli"
import Intestazione from "./intestazione"
import Riepilogo from "./Riepilogo"
import GrigliaServer from "./GrigliaServer"
import ServerInEvidenza from "./ServerInEvidenza"
import Avvisi from "./Avvisi"

function App() {
  // I dati vivono qui e scendono ai figli: App calcola, i componenti mostrano.
  const online = servers.filter(s => s.online).length
  const cercato = "db-01"

  return (
    <div className="pannello">
      <Intestazione
        nome={sistema.nome}
        aggiornato={sistema.aggiornato}
        online={online}
        totale={servers.length}
      />
      <Riepilogo
        ok={contaPerStato(servers, "ok")}
        attenzione={contaPerStato(servers, "attenzione")}
        critici={contaPerStato(servers, "critico")}
        offline={contaPerStato(servers, "offline")}
        mediaCpu={cpuMedia(servers)}
        lento={piuLento(servers)}
      />
      <GrigliaServer servers={servers} />
      <ServerInEvidenza cercato={cercato} server={trovaServer(servers, cercato)} />
      <Avvisi elenco={avvisi} />
    </div>
  )
}

export default App

/*
Risposte alla sfida «Il blackout»

1. Con SETTE server la griglia ne mostrerebbe comunque sei: GrigliaServer ha le schede
   scritte a mano per servers[0]…servers[5], quindi il settimo non comparirebbe.
   Con CINQUE server servers[5] sarebbe undefined: SchedaServer, dentro statoServer,
   leggerebbe server.online di undefined e lancerebbe un TypeError. React smonterebbe
   l'app e la pagina diventerebbe bianca. (Il riepilogo e l'intestazione invece si
   adatterebbero, perché contano sull'array.) Per questo nella settimana 8 si usa map().

2. L'idea della settimana 7 è l'interfaccia dichiarativa con flusso unidirezionale dei dati:
   i componenti descrivono cosa mostrare a partire dalle props, non come aggiornare lo
   schermo. I dati vivono in App e scendono; i componenti li leggono soltanto. Cambiando
   i dati (l'import) cambia tutto ciò che ne dipende, senza toccare i componenti.
*/
