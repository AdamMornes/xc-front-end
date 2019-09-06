<template>
    <div class="xc-cl-variant-heading">
        <hr class="xc-cl-variant-heading__divider" />
        <component class="xc-cl-variant-heading__heading" 
            :class="headingClass"
            :is="el">

            {{ title }}
        </component>
        <hr class="xc-cl-variant-heading__divider" />
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
                default: 'h2'
            }
        }   
    }
</script>
