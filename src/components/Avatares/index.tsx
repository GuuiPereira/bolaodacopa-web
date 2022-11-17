
interface UserAvatarSrc {
  avatarUrl: string
}

interface IṔrops {
  list: UserAvatarSrc[]
}

export function Avatares(props: IṔrops) {
  
  return (
    <div className="w-44 h-14 relative">
      <div className={props.list[0] ? 'w-14 h-14 rounded-full z-10 absolute top-0 left-0' : 'hidden'}>
        <img className="w-14 h-14 border-4 border-back-500 rounded-full" src={props.list[0]?.avatarUrl} alt='' width={56} height={56}></img>
      </div>
      <div className={props.list[1] ? 'w-14 h-14  rounded-full z-20 absolute top-0 left-8' : 'hidden'}>
        <img className="w-14 h-14 border-4 border-back-500 rounded-full" src={props.list[1]?.avatarUrl} alt='' width={56} height={56}></img>
      </div>
      <div className={props.list[2] ? 'w-14 h-14  rounded-full z-30 absolute top-0 left-16' : 'hidden'}>
        <img className="w-14 h-14 border-4 border-back-500 rounded-full" src={props.list[2]?.avatarUrl} alt='' width={56} height={56}></img>
      </div>
      <div className={props.list[4] ? 'w-14 h-14  rounded-full z-40 absolute top-0 left-24' : 'hidden'}>
        <img className="w-14 h-14 border-4 border-back-500 rounded-full" src={props.list[3]?.avatarUrl} alt='' width={56} height={56}></img>
      </div>
    </div>
  )
}