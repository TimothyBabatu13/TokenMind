import Image from "next/image"


const Logo = () => {
  return (
        <Image 
          src={'/logo.png'}
          height={30}
          width={30}
          alt="logo"
          draggable={false}
          className="h-full w-full rounded-full"
        />
      )
}

export default Logo