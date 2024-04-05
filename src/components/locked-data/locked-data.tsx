import { Slot, component$ } from '@builder.io/qwik';

interface LockedData {
    locked?: boolean;
    showLabel?: boolean;
}

export default component$((props: LockedData) => {
    return (
        <>
            { (props.locked != undefined && props.showLabel != undefined) &&
                <div center style="padding: 20px;">   
                    <i>Содержание скрыто с глаз долой</i>
                </div>
            }
            { props.locked != true &&
                <Slot/>
            }
        </>
    );
});
