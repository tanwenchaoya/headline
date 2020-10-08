import "../scss/index.scss"
import Header from "../component/header/index"
const header =new  Header()
const App = ($)=>{
    const $app  =$("#app")
    const init =() =>{
        render()
    }
    const render = () =>{
        _renderHeader();
    }
    const _renderHeader = () =>{
       $app.append(header.tpl({
           title:'新闻头条',
           showLeftIcon:false,
           showRightIcon:true
       }))
    }
    init()
}
App(Zepto)
