import Timer from "../model/TimerModel.js";
import TimerView from "../view/TimerView.js";
import TableModel from "../model/TableModel.js";
import TableView from "../view/TableView.js";

export default class Controller {
    constructor() {
        this.timerModel = new Timer();
        this.timerView = new TimerView(this.timerModel);
        this.tableModel = new TableModel();
        this.tableView = new TableView(this.tableModel);
        this.paused = true;
        this.spentSec = 0;
        this.spentMin = 0;
        this.spentHour = 0;
        this.end = true;
        this.dataReady = false;
    }

    init() {
        const timerDisplay1 = document.getElementById("timer1");
        timerDisplay1.innerHTML = this.timerView.timerDisplay(1);
        const timerDisplay2 = document.getElementById("timer2");
        timerDisplay2.innerHTML = this.timerView.timerDisplay(2);
        const timerDisplay3 = document.getElementById("timer3");
        timerDisplay3.innerHTML = this.timerView.timerDisplay(3);
        const startButton = document.getElementById("startTimer");
        startButton.addEventListener("click", () => this.handleStart());
        const pauseButton = document.getElementById("pauseTimer");
        pauseButton.addEventListener("click", () => this.handlePause());
        const stopButton = document.getElementById("stopTimer");
        stopButton.addEventListener("click", () => this.handleStop());
        const saveButton = document.getElementById("saveData");
        saveButton.addEventListener("click", () => this.handleSave());
        setInterval(() => {
            const table = document.getElementById("timerTable");
            table.innerHTML = this.tableView.tableDisplay();
            if(!this.paused) {
                const timerDisplay2 = document.getElementById("timer2");
                timerDisplay2.innerHTML = this.timerView.timerDisplay(2);
                const timerDisplay3 = document.getElementById("timer3");
                timerDisplay3.innerHTML = this.timerView.spentDisplay(3);
                this.spentSec = this.timerModel.getSpentTime().seconds;
                this.spentMin = this.timerModel.getSpentTime().minutes;
                this.spentHour = this.timerModel.getSpentTime().hours;
            }
        }, 1000);
    }

    handleStart() {
        this.timerModel.resetTimer();
        this.end = false;
        this.dataReady = false;
        this.paused = false;
        this.timerModel.startTimer(new Date());
        const timerDisplay1 = document.getElementById("timer1");
        timerDisplay1.innerHTML = this.timerView.timerDisplay(1);
        const timerDisplay2 = document.getElementById("timer2");
        timerDisplay2.innerHTML = this.timerView.timerDisplay(2);
        const timerDisplay3 = document.getElementById("timer3");
        timerDisplay3.innerHTML = this.timerView.clearDisplay(3);
    }

    handleStop() {
        if(this.end) {
            return;
        }
        this.timerModel.stopTimer();
        this.end = true;
        this.dataReady = true;
    }

    handlePause() {
        if(this.end) {
            return;
        }
        this.paused = !this.paused;
        if(this.paused) {
            this.timerModel.stopTimer();
        }
        else {
            this.timerModel.startTimer(new Date());
        }
    }

    handleSave() {
        if(this.dataReady) {
            const label = document.getElementById("labelTimer").value;
            const stTime = this.timerModel.getTimerStart();
            const endTime = this.timerModel.getTimer();
            const spentTime = this.timerModel.getSpentTime();
            this.tableModel.addItem(label, stTime, endTime, spentTime);
            this.dataReady = false;
        }
    }
}