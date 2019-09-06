<template>
    <div>
        <xc-heading title="Sample" style="padding-left:1rem;padding-right:1rem;" />

        <div v-html="template"></div>
    </div>
</template>

<script>
    import sample from '@/markup/components/sample/sample.html';

    export default {
        data: () => {
            return {
                template: sample
            }
        }
    };
</script>