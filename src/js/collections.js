import "../scss/collections.scss"
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
            title:'我的收藏',
            showLeftIcon:true,
            showRightIcon:false
        }))
    }
    init()
}
App(Zepto)