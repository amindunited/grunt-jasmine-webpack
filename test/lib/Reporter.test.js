'use strict';

var assert = require('assert'),
    chalk = require('chalk'),

    Reporter = require('../../tasks/lib/Reporter');

describe('Reporter', function () {
    var mockGrunt,
        writelnLog,
        errorLog,
        reporter;

    beforeEach(function () {
        writelnLog = [],
        errorLog = [];

        mockGrunt = {
            log: {
                writeln: function (ln) {
                    writelnLog.push(ln);
                },
                error: function (err) {
                    errorLog.push(err);
                }
            }
        };

        reporter = new Reporter(mockGrunt);
    });

    describe('reportSuiteStarted', function () {
        it('should indent and log correctly', function () {
            reporter.reportSuiteStarted('foobar');

            assert.equal(1, reporter.indentLevel);
            assert.equal(1, writelnLog.length);
            assert.equal('  foobar', writelnLog.pop());
        });
    });

    describe('reportSuiteDone', function () {
        it('should not log if the indent level is above 0', function () {
            reporter.indentLevel = 2;
            reporter.reportSuiteDone();

            assert.equal(1, reporter.indentLevel);
            assert.equal(0, writelnLog.length);
        });

        it('should log if the indent level is 0', function () {
            reporter.indentLevel = 1;
            reporter.reportSuiteDone();

            assert.equal(0, reporter.indentLevel);
            assert.equal(1, writelnLog.length);
            assert.equal('', writelnLog.pop());
        });
    });

    describe('reportFinish', function () {
        it('should log correct results', function () {
            reporter.reportFinish(50, 25);
            assert.equal(1, writelnLog.length);
            assert.equal(
                chalk.cyan('Results: 25/50 passed.'),
                writelnLog.pop()
            );
        });

        it('should log an error if there are failed results', function () {
            reporter.reportFinish(20, 5);

            assert.equal(1, errorLog.length);
            assert.equal(
                chalk.red('5 failures'),
                errorLog.pop()
            );
        });

        it('should not log an error if there are no failed results', function () {
            reporter.reportFinish(10, 0);
            assert.equal(0, errorLog.length);
        });
    });

    describe('reportSpec', function () {
        it('should report passing tests correctly', function () {
            reporter.reportSpec('My first test passed', [0], []);

            assert.equal(1, writelnLog.length);
            assert.equal(
                '  ' +
                    chalk.green('PASS: ') +
                    chalk.gray('My first test passed'),
                writelnLog.pop()
            );
        });

        it('should report failing tests correctly', function () {
            reporter.reportSpec(
                'My first test failed',
                [],
                [{message: 'Ruh-roh'}]
            );

            // Indent level should be incremented and then decremented
            // so it should be 0 after execution.
            assert.equal(0, reporter.indentLevel);
            assert.equal(2, writelnLog.length);

            assert.equal(
                '  ' +
                    chalk.red('FAIL: ') +
                    chalk.gray('My first test failed'),
                writelnLog[0]
            );

            assert.equal(
                '  ' + chalk.red('Ruh-roh'),
                writelnLog[1]
            );
        });
    });
})