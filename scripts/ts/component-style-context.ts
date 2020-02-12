export type ComponentStyleContext = {
    classNames: string,
    defaultClassNames: string,
    userProps: { [key: string]: any },
    statusBar?: {
        classNames: string,
        defaultClassNames: string,
        userProps: { [key: string]: any }
    },
    headerBar?: {
        classNames: string,
        defaultClassNames: string,
        userProps: { [key: string]: any }
    }
}
