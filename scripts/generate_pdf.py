import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
)

def create_guide_pdf(filename="Amba_Shakti_Rewards_System_Demo_Guide.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()
    
    # Custom Brand Styles
    primary_color = colors.HexColor("#D71920") # Amba Shakti Red
    dark_color = colors.HexColor("#1A1D20")
    text_muted = colors.HexColor("#555555")
    bg_light = colors.HexColor("#F8F9FA")
    accent_gold = colors.HexColor("#B45309")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=text_muted,
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=dark_color,
        spaceBefore=12,
        spaceAfter=6,
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#222222"),
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=dark_color,
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#2B2B2B"),
        leftIndent=15,
        firstLineIndent=-10,
    )

    table_header_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
    )

    table_cell_style = ParagraphStyle(
        'TC',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#111111"),
    )

    table_cell_bold = ParagraphStyle(
        'TCB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=primary_color,
    )

    story = []

    # Header Banner
    story.append(Paragraph("AMBA SHAKTI METALS · PARTNER ECOSYSTEM", subtitle_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Dealer Rewards & Referral Module — Demo Guide", title_style))
    story.append(Paragraph("<b>Document Reference:</b> ASM-REV-2026-v2 | <b>Release:</b> Interactive Demo / MVP Version | <b>Author:</b> Tech & Product Team", subtitle_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=4, spaceAfter=10))

    # Executive Summary Box
    summary_text = (
        "<b>Executive Summary:</b> We have implemented the complete end-to-end <b>Dealer Rewards Module</b> "
        "and <b>Customer-Contractor Referral Ecosystem</b> as specified in the corporate commercial blueprint. "
        "The application is equipped with an interactive mock state engine allowing management to test live point accruals, "
        "progressive volume multipliers (+20% & +50%), catalogue merchandise claims, and two-way referral binding in real time."
    )
    summary_table = Table([[Paragraph(summary_text, body_style)]], colWidths=[532])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF2F2")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#FECACA")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))

    # SECTION 1: Step-by-Step Demo Walkthrough
    story.append(Paragraph("1. How to Test the Demo Step-by-Step", h1_style))
    story.append(Paragraph("Follow these exact steps during your review or presentation:", body_style))
    story.append(Spacer(1, 4))

    steps = [
        "<b>Step 1 — Launch & Role Selection:</b> Open <code>http://localhost:5173/</code> in browser. On the Welcome screen, tap <i>Get Started</i> to land on <code>/role</code>. Choose <b>Dealer</b> and click <i>Continue as Dealer</i>.",
        "<b>Step 2 — Dealer Home Workspace:</b> You will immediately see the <b>Dealer Wallet Card</b> (14,850 Available Points, Gold Dealer status, Lifetime 32,400 Pts, and 17,550 Pts redeemed). Notice the new <b>🎁 Rewards</b> tab in the bottom bar.",
        "<b>Step 3 — Open Rewards & Multipliers:</b> Click the <i>View Slabs ➔</i> button or the bottom <b>Rewards</b> tab to enter the flagship Rewards Module (<code>/app/rewards</code>).",
        "<b>Step 4 — Explore 3 Distinct Views:</b><br/>"
        "&nbsp;&nbsp;• <b>🏢 Dealer Tab:</b> View the 6-Step System Architecture, Progressive Slabs Table, Recent Customer Invoices, and the 5-item Merchandise Catalogue.<br/>"
        "&nbsp;&nbsp;• <b>👥 Referral Tab:</b> View Customer Invite Code (<code>AMBA-CUST-8812</code>), WhatsApp share action, 08/02/06 real-time metrics, and Enterprise Fraud Controls.<br/>"
        "&nbsp;&nbsp;• <b>Simulator Tab:</b> Move the order slider or tap <b>[Rs. 50,000 Bonus]</b> or <b>[Rs. 1 Lakh Bonus]</b> and tap <b>Confirm & Dispatch</b>. Watch wallet points credit dynamically!",
        "<b>Step 5 — Claim Physical Gifts:</b> Click <i>Redeem</i> on any item (e.g., Workshop Tool Kit or Impact Drill). Points deduct instantly with a corporate dispatch ticket.",
        "<b>Step 6 — Reset to Blueprint Values:</b> Anytime during testing, click <b>Reset Demo</b> at the top right to restore the exact 14,850 Pts default state.",
    ]
    for step in steps:
        story.append(Paragraph(f"• {step}", bullet_style))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 8))

    # SECTION 2: Progressive Volume-Based Slabs Table
    story.append(Paragraph("2. Progressive Volume Multipliers (High-Basket Bonus Engine)", h1_style))
    story.append(Paragraph(
        "To incentivize dealers to consolidate fragmented retail demands into unified bulk billing, "
        "orders exceeding Rs. 50,000 automatically trigger commercial accelerators:", body_style
    ))
    story.append(Spacer(1, 6))

    slab_data = [
        [
            Paragraph("Customer Sale (Rs.)", table_header_style),
            Paragraph("Points Issued", table_header_style),
            Paragraph("Commercial Multiplier & Incentive", table_header_style),
            Paragraph("Business Objective", table_header_style),
        ],
        [
            Paragraph("Rs. 10,000", table_cell_bold),
            Paragraph("100 Pts", table_cell_style),
            Paragraph("Standard Base Accrual (100 Pts / Rs. 10,000)", table_cell_style),
            Paragraph("Baseline linear accrual for standard retail tons.", table_cell_style),
        ],
        [
            Paragraph("Rs. 25,000", table_cell_bold),
            Paragraph("250 Pts", table_cell_style),
            Paragraph("Linear Transaction Rate", table_cell_style),
            Paragraph("Direct proportionate volume reward.", table_cell_style),
        ],
        [
            Paragraph("Rs. 50,000", table_cell_bold),
            Paragraph("<b>600 Pts</b>", table_cell_bold),
            Paragraph("<b>+20% High-Basket Bonus</b>", table_cell_bold),
            Paragraph("Pushes dealers to combine smaller home builder orders.", table_cell_style),
        ],
        [
            Paragraph("Rs. 1,00,000", table_cell_bold),
            Paragraph("<b>1,500 Pts</b>", table_cell_bold),
            Paragraph("<b>+50% Commercial Accelerator</b>", table_cell_bold),
            Paragraph("Maximizes bulk orders, lowers distribution overhead.", table_cell_style),
        ],
    ]

    slab_table = Table(slab_data, colWidths=[95, 75, 175, 187])
    slab_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#FEF3C7")), # Highlight ₹50k
        ('BACKGROUND', (0,4), (-1,4), colors.HexColor("#D1FAE5")), # Highlight ₹100k
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(slab_table)
    story.append(Spacer(1, 10))

    # SECTION 3: Official Redemption Catalogue
    story.append(Paragraph("3. Physical Merchandise & Brand Incentives Catalogue", h1_style))
    story.append(Paragraph("Dealers can redeem points for corporate merchandise dispatched directly to their godown:", body_style))
    story.append(Spacer(1, 5))

    cat_data = [
        [
            Paragraph("Item & Category", table_header_style),
            Paragraph("Points Required", table_header_style),
            Paragraph("Specification & Commercial Grade", table_header_style),
            Paragraph("Fulfillment", table_header_style),
        ],
        [
            Paragraph("<b>Corporate Apparel</b><br/><font color='#666'>Branded Polo Shirt</font>", table_cell_style),
            Paragraph("2,000 Pts", table_cell_style),
            Paragraph("Premium dry-fit cotton with Amba Shakti embroidered crest.", table_cell_style),
            Paragraph("Corporate Dispatch", table_cell_style),
        ],
        [
            Paragraph("<b>Workshop Tool Kit</b><br/><font color='#666'>Heavy-Duty Case</font>", table_cell_style),
            Paragraph("5,000 Pts", table_cell_style),
            Paragraph("46-piece forged carbon-steel socket & wrench kit.", table_cell_style),
            Paragraph("Corporate Dispatch", table_cell_style),
        ],
        [
            Paragraph("<b>Impact Drill Machine</b><br/><font color='#666'>13mm Industrial Kit</font>", table_cell_style),
            Paragraph("10,000 Pts", table_cell_bold),
            Paragraph("750W high-torque motor, metal chuck & hammer mode.", table_cell_style),
            Paragraph("Corporate Dispatch", table_cell_style),
        ],
        [
            Paragraph("<b>Smart LED TV 55\"</b><br/><font color='#666'>4K Display Unit</font>", table_cell_style),
            Paragraph("25,000 Pts", table_cell_bold),
            Paragraph("55-inch Ultra HD 4K, HDR10+, Dolby Audio, 3-yr warranty.", table_cell_style),
            Paragraph("Corporate Dispatch", table_cell_style),
        ],
        [
            Paragraph("<b>International Travel</b><br/><font color='#666'>All-Inclusive Holiday</font>", table_cell_style),
            Paragraph("1,00,000 Pts", table_cell_bold),
            Paragraph("5 Days / 4 Nights luxury package to Dubai or Thailand (Flights & Stay).", table_cell_style),
            Paragraph("Executive Concierge", table_cell_style),
        ],
    ]

    cat_table = Table(cat_data, colWidths=[130, 85, 215, 102])
    cat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), dark_color),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(cat_table)
    story.append(Spacer(1, 10))

    # SECTION 4: Referral Ecosystem & Enterprise Fraud Controls
    story.append(Paragraph("4. Two-Way Referral Architecture & Enterprise Safeguards", h1_style))
    story.append(Paragraph(
        "<b>Tripartite Workflow:</b> End Consumer (shares code <code>AMBA-CUST-8812</code>) ➔ "
        "Contractor Onboards (submits mobile OTP & site details) ➔ Dealer Fulfills Invoiced Delivery.<br/>"
        "<b>Two-Way Benefit:</b> Consumer earns Rs. 3,000 discount balance; Contractor earns ongoing tier performance credits.",
        body_style
    ))
    story.append(Spacer(1, 5))

    fraud_rules = [
        "<b>1. Contractor Identity Verification:</b> Mandatory mobile OTP and physical site coordinates logged before binding.",
        "<b>2. First Commercial Order Rule:</b> Referral points remain strictly locked until the contractor's site logs a verified dealer delivery (Zero unearned payouts on signups).",
        "<b>3. Reciprocal Benefit Allocation:</b> Both parties receive locked accrual released simultaneously upon real invoice dispatch.",
        "<b>4. Automated Loop & Duplicate Prevention:</b> Referred contractors cannot cross-refer the original customer or share matching bank/GST details.",
    ]
    for r in fraud_rules:
        story.append(Paragraph(f"• {r}", bullet_style))
        story.append(Spacer(1, 2.5))

    story.append(Spacer(1, 12))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=4, spaceAfter=8))
    story.append(Paragraph("<b>Status:</b> Ready for Demonstration | <b>Local Dev URL:</b> <code>http://localhost:5173/</code> | <b>Mobile Optimized:</b> iPhone Shell Preview Mode", subtitle_style))

    doc.build(story)
    print(f"PDF generated successfully at {filename}")

if __name__ == '__main__':
    create_guide_pdf()
