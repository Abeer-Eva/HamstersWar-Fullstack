
interface HeaderProps {
    addHamster: () => void;
}

const Header = ({ addHamster }: HeaderProps) => {
    return (
        <header className="gallery-header">
  <h1>Hamsters War</h1>          
<h1 className="gallery-title"> Gallery</h1>
<p>It's your game , fill free to upload a new one, delete a current one or click on each hamster for more information about each and every unique hamster.</p>
<button onClick={addHamster} >Add hamster</button>
</header>
 )
    }

    export default Header;