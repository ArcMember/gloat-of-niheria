import { component$ } from '@builder.io/qwik';

interface Tags {
    tags?: string;
}

export default component$((props: Tags) => {
    const tags = props.tags?.split(", ");

    return (
        <div class="quest-tags">            
            { tags?.map((tag, ind) => {
                return  <div class="tag" key="ind">
                            {tag}
                        </div>
            })}
        </div>
    );
});
