<template>
    <div class="xc-cl-heading">
        <component 
            :is="el"
            class="xc-cl-heading__heading" 
            :class="headingClass">

            {{ title }}
        </component>

        <hr v-if="divider" class="xc-cl-heading__divider" />
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            headingClass: {
                type: String
            },
            el: {
                type: String,
                default: 'h1'
            },
            divider: {
                type: Boolean,
                default: true
            }
        }   
    }
</script>
