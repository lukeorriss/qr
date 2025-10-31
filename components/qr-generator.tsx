"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, Link2, Mail, Phone, Type, Palette, Settings2, ImageIcon, X, Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type QRDataType = "url" | "text" | "email" | "phone";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type DotType = "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
type CornerSquareType = "square" | "dot" | "extra-rounded";
type CornerDotType = "square" | "dot";

export function QRCodeGenerator() {
  const [dataType, setDataType] = useState<QRDataType>("url");
  const [qrData, setQrData] = useState("");
  const [qrColor, setQrColor] = useState("#009966");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [downloadSize, setDownloadSize] = useState([300]);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>("M");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const qrCodeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dotType, setDotType] = useState<DotType>("square");
  const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>("square");
  const [cornerDotType, setCornerDotType] = useState<CornerDotType>("square");

  const [logoImage, setLogoImage] = useState<string>("");
  const [logoSize, setLogoSize] = useState([0.3]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Email specific fields
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Phone specific field
  const [phoneNumber, setPhoneNumber] = useState("");

  // Reset form fields and clear preview when content type changes
  useEffect(() => {
    setQrData("");
    setEmailTo("");
    setEmailSubject("");
    setEmailBody("");
    setPhoneNumber("");
    // Clear the preview
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    if (qrCodeRef.current) {
      qrCodeRef.current = null;
    }
    setQrCodeUrl("");
  }, [dataType]);

  useEffect(() => {
    generateQRCode();
  }, [qrData, qrColor, bgColor, downloadSize, errorCorrection, dataType, emailTo, emailSubject, emailBody, phoneNumber, dotType, cornerSquareType, cornerDotType, logoImage, logoSize]);

  const getQRContent = () => {
    switch (dataType) {
      case "url":
      case "text":
        return qrData;
      case "email":
        const subject = emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : "";
        const body = emailBody ? `${subject ? "&" : "?"}body=${encodeURIComponent(emailBody)}` : "";
        return emailTo ? `mailto:${emailTo}${subject}${body}` : "";
      case "phone":
        return phoneNumber ? `tel:${phoneNumber}` : "";
      default:
        return qrData;
    }
  };

  const generateQRCode = async () => {
    const content = getQRContent();
    if (!content || !containerRef.current) return;

    try {
      // Dynamically import qr-code-styling (client-side only)
      const QRCodeStyling = (await import("qr-code-styling")).default;

      // Clear previous QR code
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      // Use fixed size for preview (will scale to fit container)
      const previewSize = 400;

      const options: any = {
        width: previewSize,
        height: previewSize,
        data: content,
        margin: 10,
        qrOptions: {
          errorCorrectionLevel: errorCorrection,
        },
        dotsOptions: {
          color: qrColor,
          type: dotType,
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          color: qrColor,
          type: cornerSquareType,
        },
        cornersDotOptions: {
          color: qrColor,
          type: cornerDotType,
        },
      };

      if (logoImage) {
        options.image = logoImage;
        options.imageOptions = {
          crossOrigin: "anonymous",
          margin: 8,
          imageSize: logoSize[0],
          hideBackgroundDots: true,
        };
      }

      // Update existing QR code or create new one
      if (qrCodeRef.current && containerRef.current) {
        qrCodeRef.current.update(options);
      } else {
        qrCodeRef.current = new QRCodeStyling(options);
        if (containerRef.current) {
          qrCodeRef.current.append(containerRef.current);
        }
      }

      // Generate download URL with actual download size
      const downloadOptions = { ...options, width: downloadSize[0], height: downloadSize[0] };
      const downloadQRCodeStyling = new QRCodeStyling(downloadOptions);
      const rawData = await downloadQRCodeStyling.getRawData("png");
      if (rawData) {
        // Handle both Blob and Buffer types
        let blob: Blob;
        if (rawData instanceof Blob) {
          blob = rawData;
        } else {
          // Convert Buffer to Blob
          const buffer = rawData as unknown as Buffer;
          blob = new Blob([new Uint8Array(buffer)], { type: "image/png" });
        }
        const url = URL.createObjectURL(blob);
        setQrCodeUrl(url);
      }
    } catch (err) {
      console.error("[qr] Error generating QR code:", err);
    }
  };

  const downloadQRCode = async (transparent = false) => {
    const content = getQRContent();
    if (!content) return;

    try {
      const QRCodeStyling = (await import("qr-code-styling")).default;

      const downloadOptions: any = {
        width: downloadSize[0],
        height: downloadSize[0],
        data: content,
        margin: 10,
        qrOptions: {
          errorCorrectionLevel: errorCorrection,
        },
        dotsOptions: {
          color: qrColor,
          type: dotType,
        },
        backgroundOptions: {
          color: transparent ? "transparent" : bgColor,
        },
        cornersSquareOptions: {
          color: qrColor,
          type: cornerSquareType,
        },
        cornersDotOptions: {
          color: qrColor,
          type: cornerDotType,
        },
      };

      if (logoImage) {
        downloadOptions.image = logoImage;
        downloadOptions.imageOptions = {
          crossOrigin: "anonymous",
          margin: 8,
          imageSize: logoSize[0],
          hideBackgroundDots: true,
        };
      }

      const downloadQR = new QRCodeStyling(downloadOptions);
      downloadQR.download({
        name: `qrcode-${transparent ? "transparent" : ""}-${Date.now()}`,
        extension: "png",
      });
    } catch (err) {
      console.error("Error downloading QR code:", err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasContent = () => {
    switch (dataType) {
      case "url":
      case "text":
        return qrData.trim().length > 0;
      case "email":
        return emailTo.trim().length > 0;
      case "phone":
        return phoneNumber.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_500px] gap-8 max-w-[1400px] mx-auto">
      <div className="space-y-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Type className="h-6 w-6 text-primary" />
              Content
            </CardTitle>
            <CardDescription>Choose your data type and enter content</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={dataType} onValueChange={(v) => setDataType(v as QRDataType)} className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto p-1">
                <TabsTrigger value="url" className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5">
                  <Link2 className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">URL</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5">
                  <Type className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Text</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex flex-col sm:flex-row items-center gap-1.5 py-2.5">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Phone</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-base">
                    Website URL
                  </Label>
                  <Input id="url" type="url" placeholder="https://example.com" value={qrData} onChange={(e) => setQrData(e.target.value)} className="h-11" />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-base">
                    Text Content
                  </Label>
                  <Textarea id="text" placeholder="Enter any text you want to encode..." value={qrData} onChange={(e) => setQrData(e.target.value)} rows={5} className="resize-none" />
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email-to" className="text-base">
                    Email Address
                  </Label>
                  <Input id="email-to" type="email" placeholder="contact@example.com" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-subject" className="text-base">
                    Subject (Optional)
                  </Label>
                  <Input id="email-subject" type="text" placeholder="Email subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-body" className="text-base">
                    Message (Optional)
                  </Label>
                  <Textarea id="email-body" placeholder="Email message" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} rows={4} className="resize-none" />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1234567890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="h-11" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-lg">APPEARANCE</CardTitle>
                  <CardDescription>CUSTOMISE COLOURS AND STYLES</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-color" className="text-base">
                    QR Code Colour
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Input id="qr-color" type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="h-11 w-16 cursor-pointer p-1" />
                    </div>
                    <Input type="text" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="flex-1 font-mono h-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bg-color" className="text-base">
                    Background Colour
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Input id="bg-color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-11 w-16 cursor-pointer p-1" />
                    </div>
                    <Input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 font-mono h-11" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="download-size" className="text-base">
                    Download Size
                  </Label>
                  <Badge variant="secondary" className="font-mono">
                    {downloadSize[0]}px
                  </Badge>
                </div>
                <Slider id="download-size" min={200} max={2000} step={50} value={downloadSize} onValueChange={setDownloadSize} className="w-full" />
                <p className="text-sm text-muted-foreground leading-relaxed">Preview always fits the container. This size is used for downloads only.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="dot-style" className="text-base">
                    Dot Style
                  </Label>
                  <Select value={dotType} onValueChange={(v) => setDotType(v as DotType)}>
                    <SelectTrigger id="dot-style" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                      <SelectItem value="classy">Classy</SelectItem>
                      <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="corner-square-style" className="text-base">
                    Corner Square
                  </Label>
                  <Select value={cornerSquareType} onValueChange={(v) => setCornerSquareType(v as CornerSquareType)}>
                    <SelectTrigger id="corner-square-style" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dot">Dot</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="corner-dot-style" className="text-base">
                    Corner Dot
                  </Label>
                  <Select value={cornerDotType} onValueChange={(v) => setCornerDotType(v as CornerDotType)}>
                    <SelectTrigger id="corner-dot-style" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="dot">Dot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <CardTitle className="text-lg">CENTRE LOGO</CardTitle>
                  <CardDescription>ADD A CUSTOM IMAGE OR LOGO</CardDescription>
                </div>
                {logoImage && (
                  <Badge variant="default">
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="logo-upload" className="text-base">
                  Upload Image
                </Label>
                <Input
                  ref={fileInputRef}
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer border-0 shadow-none hover:shadow-none focus:shadow-none"
                />
                <p className="text-sm text-muted-foreground leading-relaxed">Square images work best. Use high error correction for better scanning with logos.</p>
              </div>

              {logoImage && (
                <div className="space-y-5 pt-2">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-none border-2 border-black">
                    <div className="relative w-20 h-20 rounded-none overflow-hidden border-2 border-black shadow-sm">
                      <img src={logoImage || "/placeholder.svg"} alt="Logo preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Logo Preview</p>
                      <p className="text-sm text-muted-foreground">Image uploaded successfully</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={removeLogo}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="logo-size" className="text-base">
                        Logo Size
                      </Label>
                      <Badge variant="secondary" className="font-mono">
                        {Math.round(logoSize[0] * 100)}%
                      </Badge>
                    </div>
                    <Slider id="logo-size" min={0.1} max={0.6} step={0.01} value={logoSize} onValueChange={setLogoSize} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Smaller</span>
                      <span>Larger</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center">
                  <Settings2 className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-lg">ADVANCED SETTINGS</CardTitle>
                  <CardDescription>ERROR CORRECTION AND QUALITY</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="error-correction" className="text-base">
                  Error Correction Level
                </Label>
                <Select value={errorCorrection} onValueChange={(v) => setErrorCorrection(v as ErrorCorrectionLevel)}>
                  <SelectTrigger id="error-correction" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7% recovery)</SelectItem>
                    <SelectItem value="M">Medium (15% recovery)</SelectItem>
                    <SelectItem value="Q">Quartile (25% recovery)</SelectItem>
                    <SelectItem value="H">High (30% recovery)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground leading-relaxed">Higher levels allow the QR code to be read even if partially damaged or obscured by a logo</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:sticky lg:top-8 h-fit">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Preview</CardTitle>
            <CardDescription>Your QR code updates in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-muted/30 to-muted/50 rounded-none border-2 border-dashed border-black min-h-[420px] max-h-[420px] overflow-hidden">
              {hasContent() ? (
                <div ref={containerRef} data-slot="qr-preview-container" className="transition-all duration-300" />
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-28 h-28 mx-auto bg-muted/50 rounded-none flex items-center justify-center border-2 border-dashed border-black">
                    <Sparkles className="h-14 w-14 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Ready to generate</p>
                    <p className="text-sm text-muted-foreground">Enter content above to create your QR code</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => downloadQRCode(false)} disabled={!hasContent()} className="h-12 text-base" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download
              </Button>
              <Button onClick={() => downloadQRCode(true)} disabled={!hasContent()} variant="outline" className="h-12 text-base" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Transparent
              </Button>
            </div>

            {hasContent() && (
              <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-none border-2 border-black space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-none bg-primary animate-pulse" />
                  <p className="text-sm font-semibold text-foreground">QR Code Details</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Type</span>
                    <p className="font-medium capitalize">{dataType}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Download Size</span>
                    <p className="font-medium">
                      {downloadSize[0]} × {downloadSize[0]}px
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Style</span>
                    <p className="font-medium capitalize">{dotType}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Error Correction</span>
                    <p className="font-medium">{errorCorrection}</p>
                  </div>
                  {logoImage && (
                    <>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Logo</span>
                        <p className="font-medium text-primary">Enabled</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Logo Size</span>
                        <p className="font-medium">{Math.round(logoSize[0] * 100)}%</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
