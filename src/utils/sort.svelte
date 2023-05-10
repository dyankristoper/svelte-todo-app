<script context='module'>
    
    const statuses = ['pending', 'done'];
    
    /** 
        @description Sort all tasks by status
                     Pending tasks appear at the top
    */
    export const sortTaskByStatus = ( currentTask, previousTask ) => {
        return statuses.indexOf( previousTask.status ) - statuses.indexOf( currentTask.status );
    }

    export const sortByCreatedDate = ( currentTask, previousTask ) => {
        return previousTask.createdDate  - currentTask.createdDate;
    }

</script>

