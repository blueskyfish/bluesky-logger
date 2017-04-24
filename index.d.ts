/**
 * bluesky-logger - https://github.com/blueskyfish/bluesky-logger.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2017 BlueSkyFish
 */

//
// BETA
//
declare namespace logger {

	class Logger {
		trace();
		debug();
		config();
		info();
		warn();
		isTraceEnabled(): boolean;
		isDebugEnabled(): boolean;
		isConfigEnabled(): boolean;
		isInfoEnabled(): boolean;
		isWarnEnabled(): boolean;
	}

	interface Factory {
		config(namespaces: Map<string, string>): Factory;
		setSeparator(separator: string): Factory;
		setWriter(writerCallback: WriterCallback): Factory;
		getLogger(name: string): Logger;
	}

	interface WriterCallback {
		(logName: string, message: string);
	}

	export function config(namespaces: Map<string, string>): Factory;
	export function setSeparator(separator: string): Factory;
	export function setWriter(writerCallback: WriterCallback): Factory;
	export function getLogger(name: string): Logger;
}

export = logger;
export as namespace logger;
