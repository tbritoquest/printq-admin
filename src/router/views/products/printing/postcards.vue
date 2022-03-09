
<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
         <h1>Postcards</h1>
    </Layout>
   
</template>


<script>
    import Layout from '../../../layouts/main.vue'
    import PageHeader from '@/components/page-header';

    export default {
       
        components: { Layout,PageHeader},
        data() {
            return {
            title: "Postcards",
            items: [
                    {
                    text: "Skote",
                    },
                    {
                    text: "Postcards",
                    active: true,
                    },
                ]
            }
        }
    }
</script>