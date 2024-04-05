import { component$ } from '@builder.io/qwik';
import SidebarButton from '~/components/content-menu/sidebar-button/sidebar-button';

export default component$(() => {
  return (
    <header>
      <div class="left">
        <SidebarButton/>
        <a href="/search"><button class="flat"><i class="fa fa-search"/></button></a>
      </div>
      <div class="center">
        <a href="/" title="qwik">
          <h4>Злорадство Нихерии</h4>
        </a>
      </div>
      <div class="right">
        {/* <a href="/auth"><button class="flat"><i class="fa fa-wrench"/></button></a> */}
        <a href="https://t.me/niheria" target="_blank"><button class="flat"><i class="fa fa-telegram"/></button></a>
      </div>
        
    </header>
  );
});
