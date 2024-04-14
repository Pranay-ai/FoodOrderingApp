import cartIcon from '/cartIcon.svg'
export  default function Header() {

    return (
        <div className="Header">
            <div className="header-content">
                <h1>BiteQuest</h1>
                <p>"Discover flavors from around the corner or around the globe."</p>
            </div>

            <div>
                <button><img src={cartIcon} alt="" /></button>
            </div>


        </div>

    )




}