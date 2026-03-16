import streamlit as st
import json
import requests

# 1. MPANGILIO WA APP NA CSS YAKO
st.set_page_config(page_title="Mkulima Smart AI", layout="wide")

st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
    body, .stApp { font-family: 'Poppins', sans-serif; background-color: #f4f7f5; }
    .hero { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200');
            padding: 40px; color: white; border-radius: 0 0 30px 30px; text-align: center; margin-bottom: 20px; }
    .guide-card { background: white; padding: 20px; border-radius: 12px; border-left: 6px solid #198754; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px; }
    </style>
    <div class="hero">
        <h1>🚜 MKULIMA SMART AI</h1>
        <p>Ushauri wa Kilimo kwa Teknolojia ya AI</p>
    </div>
    """, unsafe_allow_html=True)

# 2. KUSOMA DATABASE (JSON)
@st.cache_data
def load_data():
    try:
        with open('crops.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        # Hii ni backup kama JSON ina makosa ya kufungwa (Syntax Error)
        return {}

crops_db = load_data()

# 3. LOGIC YA TAFUTA (SEARCH)
st.markdown('<div class="guide-card"><h5>🔍 Tafuta Mwongozo wa Zao</h5></div>', unsafe_allow_html=True)
input_zao = st.text_input("", placeholder="Andika zao (mfano: mahindi, nyanya)...").lower().strip()

if input_zao:
    # Hatua ya 1: Angalia kwenye Database ya JSON kwanza
    if input_zao in crops_db:
        zao_data = crops_db[input_zao]
        col1, col2 = st.columns([1, 2])
        with col1:
            st.image(zao_data['picha'], use_container_width=True)
        with col2:
            st.success(f"Matokeo ya: {input_zao.capitalize()}")
            st.markdown(zao_data['maelezo'], unsafe_allow_html=True)
            
    # Hatua ya 2: Kama halipo kwenye JSON, tumia AI (Gemini) kama ulivyotaka
    else:
        with st.spinner("Bwana Shamba anatafuta maelezo ya ziada..."):
            API_KEY = "AIzaSyDnnwU81GTQpGxPECI5UEI7FrNL1MIaIPw" # Key yako
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={API_KEY}"
            payload = {"contents": [{"parts": [{"text": f"Nipe maelezo mafupi ya kitaalamu kuhusu kilimo cha zao la {input_zao} nchini Tanzania. Jibu kwa Kiswahili."}]}]}
            
            try:
                res = requests.post(url, json=payload)
                ai_text = res.json()['candidates'][0]['content']['parts'][0]['text']
                st.info(f"Ushauri wa AI kwa {input_zao}:")
                st.markdown(ai_text)
                st.image(f"https://loremflickr.com/800/600/{input_zao}")
            except:
                st.error("Hitilafu ya mtandao. Jaribu tena baadae.")

# 4. SOIL TEST (UDONGO)
st.markdown('<div class="guide-card"><h5>🧪 Soil Test (Udongo)</h5></div>', unsafe_allow_html=True)
color = st.selectbox("Chagua rangi ya udongo:", ["Mweusi", "Mwekundu", "Mchanga"])
if st.button("PIMA UDONGO"):
    if color == "Mweusi":
        st.write("✅ Udongo Mweusi: Lima Mahindi, Mpunga au Mbogamboga.")
    else:
        st.write("⚠️ Udongo huu unahitaji mbolea ya samadi kuongeza rutuba.")
