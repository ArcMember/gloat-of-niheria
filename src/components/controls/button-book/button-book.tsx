import { component$ } from '@builder.io/qwik';

interface Book {
    href?: string,

    title?: string,
    subtitle?: string,
    author?: string,
    picNum: number,
    styleNum: number,    

    chapter?: boolean,
    short?: boolean,
    left?: boolean,
}

export default component$((props: Book) => {

    const bookPaths = [
        {src: "/book-assets/1.jpg", 
            style: [
                "filter: none;",
                "filter: hue-rotate(143deg);",
                "filter: hue-rotate(307deg) brightness(0.5);",
                "filter: hue-rotate(322deg);"
            ]
        },
        {src: "/book-assets/2.jpg",
            style:[
                "filter: none;",
                "filter: hue-rotate(36deg) brightness(0.7);",
                "filter: hue-rotate(178deg) saturate(0.2);",
                "filter: hue-rotate(350deg) brightness(0.6);"
            ]
        },
        {src: "/book-assets/3.jpg",
            style: [
                "filter: none;",
                "filter: hue-rotate(180deg);",
                "filter: hue-rotate(116deg) brightness(0.7);",
                "filter: hue-rotate(300deg) saturate(0.5);"
            ]
        },
        {src: "/book-assets/4.jpg",
            style:[
                "filter: none;",
                "filter: saturate(0.4) brightness(0.8);",
                "filter: hue-rotate(180deg) saturate(0.5);",
                "filter: hue-rotate(260deg) brightness(0.8);"
            ]    
        },
        {src: "/book-assets/5.jpg",
            style:[
                "filter: none;",
                "filter: hue-rotate(180deg) saturate(0.5);",
                "filter: none;",
                "filter: none;"
            ]
        }
    ]
    const chapterPath = "/book-assets/chapter.jpg";

    return (
        <a class="book-a" href={props.href}>
            <div class={`book ${props.chapter ? " chapter" : ""} ${props.short ? " short" : ""} ${props.left ? " left" : ""}`}>
                { !props.chapter &&
                <img width="900" height="105" src={bookPaths[props.picNum].src} style={bookPaths[props.picNum].style[props.styleNum]} />
                }
                { props.chapter &&
                <img width="900" height="135" src={chapterPath} />
                }
                <div class="book-spine">
                    { props.title != undefined &&
                    <div class="book-title">{props.title}</div>
                    } 
                    { props.subtitle != undefined &&
                    <div class="book-subtitle">{props.subtitle}</div>
                    }                
                </div>
                { props.author != undefined &&
                    <div class="book-author">{props.author}</div>
                }
            </div>
        </a>
    );
});
