import { useState } from "react";

const colors = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#FFFF00',
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  brown: '#A52A2A',
  gray: '#808080',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
};

function ColorButton({handleClick}) {

    const colorChange = (color) => {
        handleClick(color);
    }
  return (
    <>
      {Object.keys(colors).map((colorName) => (
        <button
          key={colorName}
          className="flex items-center font-medium text-slate-800 w-auto h-12 p-5 text-center m-2 rounded-full cursor-pointer transition hover:bg-opacity-30"
          style={{ backgroundColor: colors[colorName] }}
          onClick={() => colorChange(colors[colorName])} 
        >
          {colorName}
        </button>
      ))}
    </>
  );
}

function BgChanger() {
    const [bgColor, setBgColor] = useState("white");

    const handleClick = (color) => {
        setBgColor(color);
    }

  return (
    <div className="h-screen w-screen relative" style={{ backgroundColor: `${bgColor}` }}>
      <div className="flex justify-center items-center">
        <div className="w-fit bg-gray-400 m-5 rounded-full flex flex-wrap items-center fixed bottom-12 ">
          <ColorButton handleClick= {handleClick}/>
        </div>
      </div>
    </div>
  );
}

export default BgChanger;