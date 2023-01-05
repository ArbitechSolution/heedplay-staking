import React from 'react'
import Footer from '../components/footer/footer'
import LevelDetail from '../components/level-detail/levelDetail'
import Level from '../components/level-detail/level'
import LevelPlace from '../components/level-detail/LevelPlace'
import LevelCard from '../components/level-detail/LevelCard'

function level() {
  return (
    <>
      <div>
   <LevelDetail/>
   </div>
   <div style={{background: "linear-gradient(311deg, #121212, #0c0c0c)"}}>
   <Level/>
   <LevelPlace/>
   <LevelCard/>
   <Footer/>
   </div>
    </>
  )
}

export default level