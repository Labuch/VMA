
const REF_DISTANCES = ['10k', 'SEMI', 'MARATHON']
const MAP_DISTANCES = {
    '10k': 10,
    'SEMI': 21.1,
    'MARATHON': 42.195,

}
const INTERVALLE_DISTANCE = [200,300,400,500] 
const RATIOVMA = {
    '10k':{
        min:0.85,
        max:0.95
    },
    'SEMI':{
        min:0.80,
        max:0.90
    },
    
    'MARATHON':{
        min:0.70,
        max:0.75
    },
    
} 
const RATIOVMAINTERVALL= {
    200:{
        min:1.05,
        max:1.15
    },
    
    300:{
        min:1,
        max:1.1
    },
    400:{
        min:0.95,
        max:1
    },
    500:{
        min:0.95,
        max:1
    },
    
} 

class VmaApp {

    constructor() {
        this.distance = REF_DISTANCES[0];
        this.timeExpected = 0;
        this.vma= 0;  
        this.trainingDistance = INTERVALLE_DISTANCE[0];
      }

      get state (){

        return {
            vma: this.vma,
            trainingDistance:this.trainingDistance,
            distance:this.distance,
            timeExpected:this.timeExpected 
        }
      }


      getSpeed = (distance,time) => {
        return distance / time 

      }

      getVma = () => {
        if ( this.timeExpected== 0) {return ''} else {
            const expectedSpeed = this.getSpeed(MAP_DISTANCES[this.distance],this.timeExpected)
            const minVma = Number((expectedSpeed / RATIOVMA[this.distance].max).toFixed(1))
            const maxVma = Number((expectedSpeed / RATIOVMA[this.distance].min).toFixed(1))
    
            return `votre vma est compris entre ${minVma} et ${maxVma}`
        }
       
      }

      getIntervallTime = () => {
        
            const expectedSpeed =  this.trainingDistance / this.vma * 3.6
            const minTime = Number((expectedSpeed / RATIOVMAINTERVALL[this.trainingDistance].max).toFixed(0))
            const maxTime = Number((expectedSpeed / RATIOVMAINTERVALL[this.trainingDistance].min).toFixed(0))
            return `votre temps de passage est compris entre ${minTime} et ${maxTime}`
        }



}

app = new VmaApp()


const handleDistanceChange = (event)=>{
    app.distance = event.target.value
    estimatedVmaLabel.innerHTML = app.getVma()
}

const handleExpectedTimeChange = (event)=>{

    const time =  event.target.value.split(':')

    app.timeExpected = (parseInt(time[0])*60 + parseInt(time[1]))/60
    estimatedVmaLabel.innerHTML = app.getVma()
}


const handleVmaChange = (event)=>{

    app.vma = event.target.value
    trainingTimeLabel.innerHTML = app.getIntervallTime()
}

const handleTrainingDistanceChange = (event)=>{

    app.trainingDistance = event.target.value
    trainingTimeLabel.innerHTML = app.getIntervallTime()
}


const distanceInput = document.getElementById('distance')
const timeExpectedInput = document.getElementById('expectedTime')
const estimatedVmaLabel = document.getElementById('estimatedVma')
const vmaInput = document.getElementById('vma')
const trainingDistance = document.getElementById('trainingDistance')
const trainingTimeLabel = document.getElementById('trainingTime')



distanceInput.onchange = handleDistanceChange
timeExpectedInput.onchange = handleExpectedTimeChange
vmaInput.onchange = handleVmaChange
trainingDistance.onchange = handleTrainingDistanceChange
