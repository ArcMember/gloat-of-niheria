import { component$, useContext, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { SidebarContext } from '~/routes/layout';

interface Player {
    src: string,

    fixed?: boolean,
    compact?: boolean,
}

export default component$((props: Player) => {
    const trackName = decodeURI(props.src).split("/").slice(-1)[0].replace(".mp3", "")
    const volume = useSignal(0.5);

    const sidebarState = useContext(SidebarContext);

    useVisibleTask$(async () => {
        const vol = localStorage.getItem("volume");
        if (vol != null) 
            volume.value = Math.min(Math.max(parseFloat(localStorage.getItem("volume")!), 0), 1);
        else
            volume.value = 0.5;
    })

    return (
        <div class={"player-container paused" 
            + (props.fixed ? " fixed" : " static")
            + (props.compact ? " compact" : "")
        } 
            id={(props.fixed ? "audio-fixed" : "")} 
            offset-menu={sidebarState.value}>
            <div class="player">
                <div class="controls" 
                    onClick$={ async (e) => {
                        const container = e.srcElement.parentElement.parentElement;
                        const player = e.srcElement.parentElement.parentElement.children[1];
                        const fadingMiliseconds = 20;
                        const step = volume.value/(fadingMiliseconds-1);

                        if (container.classList.contains("paused")) {
                            player.volume = 0;
                            player.play();
                    
                            for (let i = 0; i < fadingMiliseconds; i++) {
                                await sleep(1)
                                player.volume = Math.floor((player.volume + step) * 100)/100;
                            }
                            
                            container.classList.remove("paused");
                            container.classList.add("playing");
                        }
                        else if (container.classList.contains("playing")) {
                            for (let i = 0; i < fadingMiliseconds; i++) {
                                await sleep(1);
                                player.volume = Math.ceil((player.volume - step) * 100)/100;
                            }
                    
                            player.pause();
                            container.classList.remove("playing");
                            container.classList.add("paused");
                        }
                    }}>
                    <div class="space" />
                    <div class="container">
                        <button class="play-button">
                            <i class="fa fa-pause" />
                            <i class="fa fa-play"></i>
                        </button>
                        <span class="track-name">{trackName}</span>
                    </div>
                    <span class="volume">
                        <input class="slider" type="range" min="0" max="100" value={volume.value*100} 
                            onInput$={(e) => { 
                                volume.value = e.target.value/100
                                localStorage.setItem("volume", volume.value.toString())
                                e.target.parentElement.parentElement.parentElement.parentElement.children[1].volume = volume.value;
                            }}
                        />
                    </span>
                </div>
            </div>
            <audio class="actual-player" src={props.src} />
        </div>
    );
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}