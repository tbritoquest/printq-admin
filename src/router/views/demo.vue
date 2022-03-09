<script>
    import Layout from '../layouts/main'
    import PageHeader from '@/components/page-header'

    export default {
        components: { Layout, PageHeader },
    }
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        This is New Page
    </Layout>
</template>