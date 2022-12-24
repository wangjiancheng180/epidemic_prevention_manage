
export { }

declare module 'vue' {

    interface ComponentCustomProperties {
        $filters: any,
        $data: any,
        $props: any,
        $attrs: any
    }
}