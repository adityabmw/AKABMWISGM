// ================================================================
// AKA BMW ISGM
// Enterprise Logger Engine
// Version : 3.0
// ================================================================

const LOG_LEVEL = {

    DEBUG: 0,

    INFO: 1,

    SUCCESS: 2,

    WARNING: 3,

    ERROR: 4,

    NONE: 99

};

class LoggerEngine {

    constructor() {

        this.level = LOG_LEVEL.DEBUG;

        this.enabled = true;

    }

    setLevel(level) {

        this.level = level;

    }

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

    timestamp() {

        return new Date().toISOString();

    }

    write(level, label, color, ...message) {

        if (!this.enabled) return;

        if (level < this.level) return;

        console.log(

            `%c[${label}] ${this.timestamp()}`,

            `color:${color};font-weight:bold;`,

            ...message

        );

    }

    debug(...message) {

        this.write(

            LOG_LEVEL.DEBUG,

            "DEBUG",

            "#888",

            ...message

        );

    }

    info(...message) {

        this.write(

            LOG_LEVEL.INFO,

            "INFO",

            "#2196F3",

            ...message

        );

    }

    success(...message) {

        this.write(

            LOG_LEVEL.SUCCESS,

            "SUCCESS",

            "#4CAF50",

            ...message

        );

    }

    warning(...message) {

        this.write(

            LOG_LEVEL.WARNING,

            "WARNING",

            "#FF9800",

            ...message

        );

    }

    error(...message) {

        this.write(

            LOG_LEVEL.ERROR,

            "ERROR",

            "#F44336",

            ...message

        );

    }

}

const Logger = new LoggerEngine();

export {

    Logger,

    LOG_LEVEL

};