import React from 'react'

export default function RulaCompo({icon,name,text}) {
  return (
          <div>
              {icon} 
              <div>
                <h3>{name}</h3>
                <h5>
                {text}
                </h5>
              </div>
            </div>
  )
}
