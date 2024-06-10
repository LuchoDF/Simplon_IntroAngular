import { Animal } from "./animal";

export class Cheval extends Animal{
        robe: string="";
        public asignedNumber: number = 0;
        private runningpos: number= 0;
        public finished: boolean= false;
        public perfIndex: number = 0;
        public flip: number = 0;
        MAX_LINE: number = 450;
        constructor(rname: string, pindex: number,flippete: number) {
            super(rname)
            this.perfIndex = pindex;
            this.flip = flippete;
        }
        public getName(): string {
            return this.name;
        }

        private getStepHorse(): number{
            return Math.floor(Math.random()*8 + 1);
        }
        
        public runHorse(): number{
            this.runningpos = this.runningpos + this.getStepHorse()*Math.round(1+ this.perfIndex/100);
            this.runningpos = this.runningpos*Math.round(1-this.flip/100);
            if(this.runningpos > this.MAX_LINE) {
                this.runningpos= this.MAX_LINE;
            }
            return this.runningpos;
        }

        public initPos(): void {
            this.runningpos = 0;
        }
        
        public getPos(): number {
            return this.runningpos;
        }
        
}   
