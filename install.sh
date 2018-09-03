#!/bin/sh
cp rsyslog/00-casaanMQTT.conf /etc/rsyslog.d
cp systemd/casaanMQTT.service /lib/systemd/system/
systemctl enable casaanMQTT
systemctl start casaanMQTT
