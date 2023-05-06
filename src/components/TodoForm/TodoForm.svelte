<script>
    
    import { v4 as uuid } from 'uuid';

    // Firebase
    import { db } from '../../lib/firebaseConfig';
    import { set, ref } from 'firebase/database';

    let newTaskDescription = '';

    /** 
        @description    Send POST request to Firebase
                        Adds a new task with Pending Status
    */
    const onSubmitHandler = ( e ) => {
        e.preventDefault();
        const newUUID = uuid();

        let newTask = {
            id: newUUID,
            name: newTaskDescription,
            status: 'Pending'
        };

        // Save record to Realtime Database
        set( ref( db, `/${ newUUID }`), newTask );

        // Clear new task value
        newTaskDescription = '';
    }

</script>


<form on:submit={ onSubmitHandler }>
    <input
        type ='text'
        placeholder='Enter new task description...'
        bind:value={ newTaskDescription }
    >
    <input
        type='submit'
        value='+ Add Task'
    >
</form>