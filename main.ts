function Schranke_zu () {
    basic.showIcon(IconNames.ArrowSouth)
    Motor2 = 100
    motors.motorPower(Motor2)
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Schaltwert += -5
    basic.showNumber(Schaltwert)
})
function Motor_aus () {
    basic.clearScreen()
    Motor2 = 0
    motors.motorCommand(MotorCommand.Break)
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Schaltwert += 5
    basic.showNumber(Schaltwert)
})
function _ (Kommentar: string) {
	
}
function Schranke_auf () {
    basic.showIcon(IconNames.ArrowNorth)
    Motor2 = -100
    motors.motorPower(Motor2)
}
let Helligkeit = 0
let Motor2 = 0
let Schaltwert = 0
_("calliope-net/ft3-schranke-61")
let o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
pins.digitalWritePin(DigitalPin.P0, 1)
Schaltwert = 60
basic.pause(500)
Schranke_zu()
loops.everyInterval(400, function () {
    Helligkeit = pins.analogReadPin(AnalogPin.P1)
    o4digit.show(Helligkeit)
    if (Motor2 == 0 && Helligkeit > Schaltwert) {
        _("Motor aus und Lichtschranke dunkel -> Schranke öffnen")
        Schranke_auf()
    } else if (Motor2 < 0 && input.pinIsPressed(TouchPin.P2)) {
        _("Motor öffnet Schranke (m < 0) und Schranke ist ganz offen (P2) -> Motor aus")
        Motor_aus()
        _("nach 5 Sekunden -> Schranke wieder schließen")
        for (let Index = 0; Index <= 4; Index++) {
            basic.showNumber(Index)
            basic.pause(1000)
        }
        Schranke_zu()
    } else if (Motor2 > 0 && input.pinIsPressed(TouchPin.P3)) {
        _("Motor schließt Schranke (m > 0) und Schranke ist ganz geschlossen (P3) -> Motor aus")
        Motor_aus()
    }
})
