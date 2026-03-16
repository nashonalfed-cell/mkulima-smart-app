import streamlit as st
import json
import requests

# MPANGILIO WA UKURASA
st.set_page_config(page_title="Mkulima Smart AI", layout="wide", initial_sidebar_state="collapsed")

# CSS YAKO (Ili muonekano uwe ule ule mzuri wa kijani)
st.markdown("""
    <style>
    .main { background-color: #f0f2f6; }
    .stTextInput>div>div>input { border-radius: 25px; border: 2px solid #2e7d32; padding: 10px 20px; }
    .crop-card { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 5px solid #2e7d32; }
    .hero-section { background: linear-gradient(135deg, #1b5e20 0%, #4caf50 100%); color: white; padding: 40px; border-radius: 0 0 30px 30px; text-align: center; margin-bottom: 30px; }
    </style>
    <div class="hero-section">
        <h1>🚜 MKULIMA SMART AI</h1>
        <p>Ushauri wa Kilimo wa Papo kwa Papo (Arusha Edition)</p>
    </div>
    """, unsafe_allow_html=True)

# KUSOMA DATABASE YA JSON
@st.cache_data
def load_crops():
    try:
        with open('crops.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        st.error(f"Hitilafu ya Database: Hakikisha crops.json haina makosa ya koma au nukuu. Error: {e}")
        return {}

crops_db = load_crops()

# SEHEMU YA TAFUTA (SEARCH)
search_query = st.text_input("", placeholder="Andika jina la zao hapa (mfano: Vanilla, Mahindi)...").lower().strip()

if search_query:
    # 1. Angalia kwenye JSON kwanza
    if search_query in crops_db:
        data = crops_db[search_query]
        st.markdown(f'<div class="crop-card">', unsafe_allow_html=True)
        col1, col2 = st.columns([1, 2])
        with col1:
            # Tunatumia picha kutoka kwenye JSON yako au picha ya akiba kama link imekufa
            img_url = data.get('image') or data.get('picha')
            st.image(img_url, use_container_width=True)
        with col2:
            st.subheader(search_query.upper())
            # Maelezo kutoka kwenye JSON (description au maelezo)
            desc = data.get('description') or data.get('maelezo')
            st.markdown(desc, unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    
    # 2. Kama halipo, tumia Gemini AI (Bwana Shamba)
    else:
        with st.spinner("Bwana Shamba anatafuta maelezo ya ziada..."):
            API_KEY = "AIzaSyDnnwU81GTQpGxPECI5UEI7FrNL1MIaIPw"
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={API_KEY}"
            payload = {"contents": [{"parts": [{"text": f"Wewe ni mtaalamu wa kilimo Tanzania. Nipe ushauri mfupi wa kitaalamu wa kilimo cha {search_query} kwa Kiswahili."}]}]}
            try:
                res = requests.post(url, json=payload)
                ai_text = res.json()['candidates'][0]['content']['parts'][0]['text']
                st.info(f"Ushauri wa AI kwa {search_query}:")
                st.write(ai_text)
            except:
                st.warning("Samahani, sijapata maelezo ya zao hili. Jaribu kuandika kwa usahihi.")

# FOOTER
st.markdown("<br><hr><center><p>Imeundwa na Nashon Alfred &copy; 2026</p></center>", unsafe_allow_html=True)
