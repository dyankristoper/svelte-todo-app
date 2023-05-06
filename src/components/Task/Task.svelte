<script>
	import 'ionic-svelte/components/ion-button';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-header';
	import 'ionic-svelte/components/ion-content';

    // Get props here
    export let description;
    export let status;

</script>

<ion-card>
    <ion-card-header>
        <ion-card-title>{ description }</ion-card-title>
    </ion-card-header>
    <ion-card-content>
        {#if status === 'pending' }
            <ion-button>Mark as Done</ion-button>
        {/if}
        <ion-button>Delete</ion-button>
    </ion-card-content>
</ion-card>



