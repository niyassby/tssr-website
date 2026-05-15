import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import logo from '../../assets/Logo.png';
import { format } from 'date-fns';

const url = 'https://tssrcouncil.com';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#F1F5F9', // light gray background for the A4 page
        fontFamily: 'Helvetica',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticketContainer: {
        width: 400,
        backgroundColor: '#121217',
        borderRadius: 16,
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A35',
        borderBottomStyle: 'solid',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 40,
        height: 40,
        marginRight: 8,
        objectFit: 'contain',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 1,
    },
    logoText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    passText: {
        fontSize: 10,
        color: '#8A8A8E',
        letterSpacing: 2,
        fontWeight: 'bold',
    },
    body: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eventInfo: {
        flex: 1,
        paddingRight: 16,
    },
    eventName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
        lineHeight: 1.2,
    },
    eventProgram: {
        fontSize: 12,
        color: '#FFFFFF',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    infoLabel: {
        fontSize: 9,
        color: '#606060',
        // textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
        // fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 12,
        color: '#FFFFFF',
        marginBottom: 6,
    },
    infoValueLocation: {
        fontSize: 12,
        color: '#FFFFFF',
    },
    qrCodeContainer: {
        // width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    qrCodeBg: {
        backgroundColor: '#FFFFFF',
        padding: 6,
        borderRadius: 8,
        width: 120,
        height: 120,
    },
    qrImage: {
        width: '100%',
        height: '100%',
    },
    dividerContainer: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
    },
    notchLeft: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F1F5F9', // Matches page background!
        position: 'absolute',
        left: -12,
        top: 0,
    },
    notchRight: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        position: 'absolute',
        right: -12,
        top: 0,
    },
    dashedLine: {
        flex: 1,
        borderTopWidth: 1.5,
        borderTopColor: '#2A2A35',
        borderTopStyle: 'dashed',
        marginHorizontal: 16,
        marginTop: 12,
    },
    footer: {
        padding: 24,
        paddingTop: 16,
        backgroundColor: '#18181F', // Slightly different shade for footer
    },
    attendeeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendeeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        objectFit: 'cover',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#2A2A35',
        borderStyle: 'solid',
    },
    attendeeImagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2A2A35',
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    attendeeImagePlaceholderText: {
        color: '#8A8A8E',
        fontSize: 24,
        fontWeight: 'bold',
    },
    attendeeDetails: {
        flex: 1,
    },
    attendeeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    attendeeContactText: {
        fontSize: 10,
        color: '#A1A1AA',
        marginBottom: 2,
    },
    footerBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#2A2A35',
        borderTopStyle: 'solid',
    },
    bookingIdBox: {
        backgroundColor: '#2A2A35',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 4,
    },
    bookingIdText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    watermark: {
        position: 'absolute',
        top: 150,
        left: 50,
        fontSize: 100,
        color: '#FFFFFF',
        opacity: 0.02,
        transform: 'rotate(-45deg)',
        fontWeight: 'bold',
    }
});

const EventSlip = ({ data, studentData }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);

    const event = data || {};
    const student = studentData || data?.studentData || {};
    const id = student?.recordId || event?.record?._id || student?.regNo || '000';

    useEffect(() => {
        const generateQR = async () => {
            try {
                const urlString = url + "/#/event-verification/" + id;
                const qrUrl = await QRCode.toDataURL(urlString, {
                    errorCorrectionLevel: 'M',
                    type: 'image/png',
                    margin: 1,
                    color: {
                        dark: '#000000ff',
                        light: '#ffffffff'
                    }
                });
                setQrCodeUrl(qrUrl);
            } catch (err) {
                console.error('Failed to generate QR:', err);
            }
        };

        if (id) {
            generateQR();
        }
    }, [id]);

    const dateObj = event.date ? new Date(event.date, {
        timeZone: "Asia/Kolkata",
      }) : new Date();
    const formattedDate = format(dateObj, 'EEEE, MMMM dd, yyyy');
    const timeString = event.time?.from ? `${event.time.from} ${event.time.to ? '- ' + event.time.to : ''}` : 'TBA';

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.ticketContainer}>
                    <Text style={styles.watermark}>TSSR</Text>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image source={logo} style={styles.logoImage} />
                            <Text style={styles.logoText}>TSSR COUNCIL</Text>
                        </View>
                        <Text style={styles.passText}>ADMISSION PASS</Text>
                    </View>

                    {/* Body */}
                    <View style={styles.body}>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventName}>{event.eventName || 'Event Name'}</Text>
                            <Text style={styles.eventProgram}>{event.eventProgram || 'Event Program'}</Text>

                            {/* <Text style={styles.infoLabel}>Date & Time</Text> */}
                            <Text style={styles.infoValue}>{formattedDate} • {timeString}</Text>

                            {/* <Text style={styles.infoLabel}>Location</Text> */}
                            <Text style={styles.infoValueLocation}>
                                {event.location || 'TSSR Council Location, Event City'}
                            </Text>
                            <View style={styles.qrCodeContainer}>
                                {qrCodeUrl ? (
                                    <View style={styles.qrCodeBg}>
                                        <Image source={qrCodeUrl} style={styles.qrImage} />
                                    </View>
                                ) : (
                                    <View style={[styles.qrCodeBg, { width: 100, height: 100 }]} />
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Divider Area */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.notchLeft} />
                        <View style={styles.dashedLine} />
                        <View style={styles.notchRight} />
                    </View>

                    {/* Footer / Attendee Info */}
                    <View style={styles.footer}>
                        <View style={styles.attendeeRow}>
                            {student?.profileImage ? (
                                <Image source={student.profileImage} style={styles.attendeeImage} />
                            ) : (
                                <View style={styles.attendeeImagePlaceholder}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' }}>
                                        <Text style={styles.attendeeImagePlaceholderText}>
                                            {(student.name || event.userName || 'S').charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <View style={styles.attendeeDetails}>
                                <Text style={styles.attendeeName}>{student.name || event.userName || 'Student Name'}</Text>
                                <Text style={styles.attendeeContactText}>{student.email || 'N/A'}</Text>
                                <Text style={styles.attendeeContactText}>{student.phoneNumber || 'N/A'}</Text>
                                <Text style={styles.attendeeContactText}>{student.address || 'N/A'}</Text>
                            </View>
                        </View>

                        <View style={styles.footerBottomRow}>
                            <View>
                                <Text style={styles.infoLabel}>Booking ID</Text>
                                <View style={styles.bookingIdBox}>
                                    <Text style={styles.bookingIdText}>{student.regNo || 'N/A'}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.infoLabel}>Valid For</Text>
                                <Text style={styles.bookingIdText}>1 PERSON</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default EventSlip;