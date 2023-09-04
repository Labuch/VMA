
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
    100:{
        min:1.05,
        max:1.15
    },
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
    800:{
        min:0.85,
        max:0.95
    },
    1000:{
        min:0.8,
        max:0.9
    },
    1500:{
        min:0.8,
        max:0.9
    },
    2000:{
        min:0.80,
        max:0.85
    },
    
} 



const getFormatedTime = (totalSeconds)=>{
    const minutes = Math.floor(totalSeconds/60); 
    const seconds =  totalSeconds - minutes * 60 ;

    return `${minutes}:${seconds}s`

} 

class VmaApp {

    constructor() {
        this.distance = REF_DISTANCES[0];
        this.minuteExpected = 0;
        this.hourExpected = 0;
        this.timeExpected = 0;
        this.vma= 0;  
        this.trainingDistance = 0;
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
        if ( this.timeExpected == 0) {return ''} else {
            const expectedSpeed = this.getSpeed(MAP_DISTANCES[this.distance],this.timeExpected/60)
            const minVma = Number((expectedSpeed / RATIOVMA[this.distance].max).toFixed(1))
            const maxVma = Number((expectedSpeed / RATIOVMA[this.distance].min).toFixed(1))
            this.vma =  Number(((minVma +  maxVma) /2 ).toFixed(1))
            return this.vma 
        }
       
      }

      getIntervallTime = () => {
        if ( this.vma == 0 || this.trainingDistance == 0 ) {return {min:'', max:''}} else {
            const expectedSpeed =  this.trainingDistance / this.vma * 3.6
            const minTime = Number((expectedSpeed / RATIOVMAINTERVALL[this.trainingDistance].max).toFixed(0))
            const maxTime = Number((expectedSpeed / RATIOVMAINTERVALL[this.trainingDistance].min).toFixed(0))
            return { min: getFormatedTime(minTime),max: getFormatedTime(maxTime)}
        }
    }



}

app = new VmaApp()


const handleDistanceChange = (event)=>{
    app.distance = event.target.value
    app.getVma()
    if (!!app.vma){
        estimatedVmaLabel.innerHTML = app.vma
        vmaLabel.innerHTML = app.vma
        vmaInput.value = app.vma    
    }
}

const handleDistanceIn6minChange = (event)=>{
    computedVmaVmaLabel.innerHTML = (app.getSpeed(event.target.value/1000, 1/10)).toFixed(1)
}

const handleDistanceIn6minInput = (event)=>{
    event.target.value = event.target.value.replace(/\D+/g, '')
}

const handleMinuteExpectedChange = (event)=>{

    app.minuteExpected = parseInt(event.target.value)
    app.timeExpected = (app.hourExpected) * 60 + app.minuteExpected 
    app.getVma()

    if (!!app.vma){
        estimatedVmaLabel.innerHTML = app.vma
        vmaLabel.innerHTML = app.vma
        vmaInput.value = app.vma    
    }
}

const handleHourExpectedChange = (event)=>{

    app.hourExpected =  parseInt(event.target.value)
    app.timeExpected = (app.hourExpected) * 60 + app.minuteExpected 
    app.getVma()
  if (app.vma){
        estimatedVmaLabel.innerHTML = app.vma
        vmaLabel.innerHTML = app.vma
        vmaInput.value = app.vma    
    }
}


const handleVmaChange = (event)=>{
    const newVma = event.target.value
    app.vma = newVma
    vmaLabel.innerHTML = app.vma
    const times = app.getIntervallTime()
    minTrainingTime.innerHTML = times.min
    maxTrainingTime.innerHTML = times.max
}

const handleTrainingDistanceChange = (event)=>{

    app.trainingDistance = event.target.value
    const times = app.getIntervallTime()
    minTrainingTime.innerHTML = times.min
    maxTrainingTime.innerHTML = times.max
}


const distanceInput = document.getElementById('distance')
const hourExpectedInput = document.getElementById('hourExpected')
const minExpectedInput = document.getElementById('minuteExpected')
const estimatedVmaLabel = document.getElementById('estimatedVma')
const computedVmaVmaLabel = document.getElementById('computedVma')
const distanceIn6minInput = document.getElementById('distanceIn6min')
const vmaInput = document.getElementById('vma')
const vmaLabel =  document.getElementById('vmaLabel')
const trainingDistance = document.getElementById('trainingDistance')
const minTrainingTime = document.getElementById('minTrainingTime')
const maxTrainingTime = document.getElementById('maxTrainingTime')

distanceIn6minInput.oninput = handleDistanceIn6minInput
distanceIn6minInput.onchange = handleDistanceIn6minChange
distanceInput.onchange = handleDistanceChange
hourExpectedInput.onchange = handleHourExpectedChange
minExpectedInput.onchange = handleMinuteExpectedChange
vmaInput.onchange = handleVmaChange
trainingDistance.onchange = handleTrainingDistanceChange
