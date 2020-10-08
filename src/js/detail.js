import "../scss/detail.scss"
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
            title:'新闻详情',
            showLeftIcon:true,
            showRightIcon:true
        }))
    }
    init()
}
App(Zepto)