import { component$ } from '@builder.io/qwik';
import ButtonHeader from '~/components/controls/button-header/button-header';

export default component$(() => {
    return (
        <div class="page-header">
            <div center onClick$={() => {history.back()}}><ButtonHeader noUnderline size={1} title="Назад" href="" /></div>
            <div center><ButtonHeader noUnderline size={1} title="Меню" href="/" /></div>            
        </div>        
    );
});
