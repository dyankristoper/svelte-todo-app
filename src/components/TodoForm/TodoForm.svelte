<script>
    
    import { v4 as uuid } from 'uuid';

    // Ionic components
    import 'ionic-svelte/components/ion-button';
    import 'ionic-svelte/components/ion-item';
    import 'ionic-svelte/components/ion-input';

    // Firebase
    import { db } from '$lib/firebaseConfig';
    import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

    let newTaskDescription = '';
    const collectionRef = collection( db, 'tasks' );

    /** 
        @description    Send POST request to Firebase
                        Adds a new task with Pending Status
    */
    const onSubmitHandler = ( e ) => {
        e.preventDefault();

        let newTask = {
            description: newTaskDescription,
            status: 'pending',
            createdDate: serverTimestamp()
        };

        const addNewTask = async () => {
            await addDoc( collectionRef, newTask );
        }

        addNewTask();

        // Clear new task value
        newTaskDescription = '';
    }

</script>


<form on:submit={ onSubmitHandler }>
    <ion-grid>
        <ion-row>
            <ion-col size='8'>
                <input
                    type ='text'
                    placeholder='Enter new task description...'
                    bind:value={ newTaskDescription }
                >
            </ion-col>
            <ion-col size='auto'>
                <ion-button
                    type='submit'
                    size='small'    
                >
                    Add Task
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</form>

<style>

input{
    height: 100%;
    width:  100%;
}

</style>