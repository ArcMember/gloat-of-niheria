
import { component$, Slot } from '@builder.io/qwik';

interface AuthorPic {
    src?: string;
    author?: string;
    authorHref?: string;
    left?: boolean;
    right?: boolean;
}

export default component$((props: AuthorPic) => {
    return (        
        <div class={"author-pic-container" 
                    + (props.left ? " left" : "")
                    + (props.right ? " right" : "")
                    }>
            <a class="author-pic">
                <img src={props.src} class="main" ></img>               
            </a>
            { (props.author != undefined) &&
            <a class="author" href={props.authorHref}>Автор — {props.author}</a>
            }
            <Slot/>
        </div>
    );
});
