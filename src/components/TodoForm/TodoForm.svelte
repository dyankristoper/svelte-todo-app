<script>
    
    import axios from 'axios';

    let newTaskDescription = '';

    /** 
        @description    Send POST request to Firebase
                        Adds a new task with Pending Status
    */
    const onSubmitHandler = ( e ) => {
        e.preventDefault();

        let newTask = {
            name: newTaskDescription,
            status: 'Pending'
        };

        axios.post( 'https://firebase.com' , newTask )
            .then( response => console.log( response ) )
            .catch( e => console.error( e ))

        // Clear new task value
        newTask = '';
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